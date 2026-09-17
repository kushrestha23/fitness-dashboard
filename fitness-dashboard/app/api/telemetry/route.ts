import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const startDate = '2026-05-01';
    
    // Simple query first to test table connection and data retrieval
    const telemetryData = await sql`
      SELECT log_date, log_time, weight_kg, bmi, fat_percent, metabolism_kcal 
      FROM health_telemetry 
      WHERE log_date >= ${startDate} 
      ORDER BY log_date ASC, log_time ASC
    `;

    return NextResponse.json({ 
      success: true, 
      records: telemetryData.rows 
    });
  } catch (error: any) {
    console.error('Database query error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      detail: error.detail 
    }, { status: 500 });
  }
}