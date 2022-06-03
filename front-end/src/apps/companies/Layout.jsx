import Nav from "../../components/Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">{children}</div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default Layout;
