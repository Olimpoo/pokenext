import PropTypes from 'prop-types';
import styles from './Layout.module.css';

function Layout({ children }) {
  return <div className={styles.Layout__container}>{children}</div>;
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
