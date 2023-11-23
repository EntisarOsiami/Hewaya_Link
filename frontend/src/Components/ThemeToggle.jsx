import { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../slices/themeSlice';
import { BsMoon, BsSun } from 'react-icons/bs';

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]); 

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <span onClick={handleToggle} style={{ cursor: 'pointer' , padding:'20px'}}>
      {theme === 'light' ? 
        <BsMoon size={24} color= "#65344c" /> :  
        <BsSun size={24} color="#cb9ab2" />    
      }
    </span>
  );
};

export default ThemeToggle;
