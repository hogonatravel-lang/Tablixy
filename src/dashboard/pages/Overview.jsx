const Overview = ({ hotel, profile }) => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Overview</h2>
      <div className="flex gap-4 flex-wrap">
        <div className="stat-card">Total Tables: {hotel.tables}</div>
        <div className="stat-card">Orders: {hotel.orders?.length || 0}</div>
        <div className="stat-card">Vacancies: {hotel.tables - (hotel.occupiedTables?.length || 0)}</div>
      </div>

      <style>{`
        .stat-card { background:#05100a; padding:1rem 2rem; border-radius:10px; flex:1; text-align:center; }
      `}</style>
    </div>
  );
};

export default Overview;
