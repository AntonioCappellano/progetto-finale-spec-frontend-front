export default function SideBar() {
  return (
    <div className="bg-dark text-white d-flex flex-column p-3 vh-100 border-end border-secondary">
      <div className="sidebar-header pb-3 mb-3 border-bottom border-secondary">
        <h5 className="m-0 fw-bold text-primary">Titolo Sidebar</h5>
      </div>
      <div className="sidebar-body flex-grow-1">
        <p className="text-muted small">I tuoi link andranno qui...</p>
      </div>
    </div>
  );
}
