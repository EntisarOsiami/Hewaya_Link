import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../slices/themeSlice.js';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';


const ThemeToggle = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const iconColor = currentTheme === 'light' ? '#65344c' : '#cb9ab2';

  return (
    <span onClick={handleToggle} style={{ cursor: 'pointer', padding: '20px' }}>
      {currentTheme === 'light' ? (
        <BsMoonFill size={24} color={iconColor} />
      ) : (
        <BsSunFill size={24} color={iconColor} />
      )}
    </span>
  );
};

export default ThemeToggle;
