import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { source, records } = await req.json();

    if (!records || !Array.isArray(records) || records.length === 0) {
      return NextResponse.json({ error: 'No records provided' }, { status: 400 });
    }

    const client = await pool.connect();
    
    try {
      // Start a SQL Transaction
      await client.query('BEGIN');

      let upsertedCount = 0;
      let errors = [];

      for (const record of records) {
        try {
          if (source === 'pacer') {
            const query = `
              INSERT INTO daily_metrics (date, steps, distance_km, active_time_mins)
              VALUES ($1, $2, $3, $4)
              ON CONFLICT (date) DO UPDATE SET
                steps = EXCLUDED.steps,
                distance_km = EXCLUDED.distance_km,
                active_time_mins = EXCLUDED.active_time_mins,
                updated_at = CURRENT_TIMESTAMP;
            `;
            await client.query(query, [record.date, record.steps, record.distance_km, record.active_time_mins]);
            upsertedCount++;
          } else if (source === 'whoop') {
            const query = `
              INSERT INTO daily_metrics (
                date, recovery_score, strain, rhr, hrv, 
                sleep_duration_mins, sleep_performance, calories_burned
              )
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
              ON CONFLICT (date) DO UPDATE SET
                recovery_score = EXCLUDED.recovery_score,
                strain = EXCLUDED.strain,
                rhr = EXCLUDED.rhr,
                hrv = EXCLUDED.hrv,
                sleep_duration_mins = EXCLUDED.sleep_duration_mins,
                sleep_performance = EXCLUDED.sleep_performance,
                calories_burned = EXCLUDED.calories_burned,
                updated_at = CURRENT_TIMESTAMP;
            `;
            await client.query(query, [
              record.date, record.recovery_score, record.strain, record.rhr, 
              record.hrv, record.sleep_duration_mins, record.sleep_performance, record.calories_burned
            ]);
            upsertedCount++;
          }
        } catch (err) {
          // If a single row fails, log it but don't crash the whole import
          errors.push({ record, error: (err as Error).message });
        }
      }

      // Log the ingestion metrics to prove data quality
      const logQuery = `
        INSERT INTO import_logs (data_source, records_processed, records_upserted, errors)
        VALUES ($1, $2, $3, $4)
      `;
      await client.query(logQuery, [source, records.length, upsertedCount, JSON.stringify(errors)]);

      // Commit transaction
      await client.query('COMMIT');
      
      return NextResponse.json({ success: true, processed: records.length, upserted: upsertedCount, errors });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Import API Error:', error);
    return NextResponse.json({ error: 'Server error during import' }, { status: 500 });
  }
}