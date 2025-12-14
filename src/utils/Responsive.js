import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * Chuyển đổi phần trăm chiều rộng thành pixel
 * @param {number} widthPercent - Phần trăm mong muốn (ví dụ: 50 cho 50%)
 * @returns {number} - Giá trị pixel tương ứng
 */
const wp = (widthPercent) => {
    const elemWidth =
        typeof widthPercent === "number"
            ? widthPercent
            : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

/**
 * Chuyển đổi phần trăm chiều cao thành pixel
 * @param {number} heightPercent - Phần trăm mong muốn
 * @returns {number} - Giá trị pixel tương ứng
 */
const hp = (heightPercent) => {
    const elemHeight =
        typeof heightPercent === "number"
            ? heightPercent
            : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

export { hp, SCREEN_HEIGHT, SCREEN_WIDTH, wp };
