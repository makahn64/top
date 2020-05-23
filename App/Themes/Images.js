// leave off @2x/@3x
const images = {
  logoBug: require('../Images/winex-bug.png'),
  logo150: require('../Images/winex-logo-150x25.png'),
  logo300: require('../Images/winex-logo-300.png'),
  placeholderSquare: require('../Images/placeholder-128x128.png'),
  placeholderBanner: require('../Images/genericbanner-3-to-1.jpg'),
};

export default images;

export const useImages = () => {
  return images;
}
