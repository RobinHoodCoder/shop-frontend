import Header from './Header/Header';
import styles from './Page.module.scss';
const Page = (props) => {
  return (
    <div>
      <div className={styles.page}>
        <Header/>
        <p>Page component</p>
        {props.children}
      </div>
    </div>
  );
};
export default Page;
