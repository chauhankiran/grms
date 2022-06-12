const Pagination = ({ page, size, count, handlePrev, handleNext }) => {
  return (
    <div className="row">
      <div className="col-md-12 text-end">
        {page === 1 ? (
          <button
            className="btn btn-outline-primary me-2 disabled"
            onClick={handlePrev}
          >
            Prev
          </button>
        ) : (
          <button className="btn btn-outline-primary me-2" onClick={handlePrev}>
            Prev
          </button>
        )}

        {page * size >= count ? (
          <button
            className="btn btn-outline-primary disabled"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button className="btn btn-outline-primary" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
