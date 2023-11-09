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
    <span onClick={handleToggle} style={{ cursor: 'pointer' }}>
      {theme === 'light' ? 
        <BsMoon size={18} color="#fff" /> :  
        <BsSun size={18} color="#fff" />    
      }
    </span>
  );
};

export default ThemeToggle;
