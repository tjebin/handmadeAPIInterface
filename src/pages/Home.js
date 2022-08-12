import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/appContext';
import { Redirect } from 'react-router-dom';
import logo from '../assets/handmade_logo.png';
import bedding_set from '../assets/bedding_set.jpg';
import bamboo_tray from '../assets/bamboo_tray.jpg';


function Home() {
  const { user } = useGlobalContext();

  return (
    <>
      {user && <Redirect to='/dashboard' />}
      <Wrapper>
        <nav>
          <img src={logo} alt='jobs app' />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>Handmade API Interface</h1>
            <Link to='/register' className='btn hero-btn'>
              Login / Register
            </Link>
          </div>
          <article className="img-container">
            <img src={bedding_set} alt="Main Img" className='main-img' />
            <img src={bamboo_tray} alt="Main Img" className='accent-img' />
          </article>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .container {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
  }

  .img-container {
    display:none;
  }
  h1 {
    font-weight: 700;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .container {
      grid-template-columns: 1fr 1fr;
      column-gap: 10rem;
    }
    .main-img {
      display: block;
    }
     .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: inherit;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 90%;
      background: var(--clr-primary-9);
      top: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`;

export default Home;
