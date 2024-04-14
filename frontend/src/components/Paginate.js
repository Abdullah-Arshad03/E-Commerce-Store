import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false}) => {
  return (
    pages > 1 && (<>
    <div className='pagination-dark '>
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin ?  `/page/${x + 1}` : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item className="" active={x + 1 === page}>   {x + 1}  </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
      </div> </>)
  );
};

export default Paginate;
