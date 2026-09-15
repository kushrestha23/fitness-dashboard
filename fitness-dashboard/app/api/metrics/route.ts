import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const client = await pool.connect();
    
    // Fetch aggregate statistics from daily_metrics
    const summaryResult = await client.query(`
      SELECT 
        COUNT(*) as total_days,
        SUM(steps) as lifetime_steps,
        ROUND(AVG(steps)) as avg_daily_steps,
        SUM(distance_km) as total_distance,
        ROUND(AVG(recovery_score)) as avg_recovery,
        ROUND(AVG(strain), 1) as avg_strain,
        ROUND(AVG(sleep_duration_mins) / 60.0, 1) as avg_sleep_hours
      FROM daily_metrics;
    `);

    // Fetch the last 14 days of records for trend charts
    const recentResult = await client.query(`
      SELECT date, steps, recovery_score, strain, sleep_duration_mins
      FROM daily_metrics
      ORDER BY date DESC
      LIMIT 14;
    `);

    client.release();

    return NextResponse.json({
      summary: summaryResult.rows[0],
      recent: recentResult.rows.reverse(), // Chronological order for charts
    });
  } catch (error: any) {
    console.error('Metrics API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}