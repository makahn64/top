// leave off @2x/@3x
const images = {
  logo: require('../Images/logo.png'),
  logoblue: require('../Images/logoblue.png'),
  placeholderBanner: require('../Images/brokenimage.png'),
  splash: require('../Images/splash.png'),
};

export default images;

export const useImages = () => {
  return images;
}
