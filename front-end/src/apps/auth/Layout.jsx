import Nav from "../../components/Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">{children}</div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default Layout;
