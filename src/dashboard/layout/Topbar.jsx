const Topbar = ({ profile }) => {
  return (
    <div style={{padding:"1rem 0", borderBottom:"1px solid #00ff66"}}>
      <span>Welcome, {profile?.role?.toUpperCase()}</span>
    </div>
  );
};

export default Topbar;
