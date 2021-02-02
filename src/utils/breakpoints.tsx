export const size = {
    mobile: "767px",
    desktop: "768px",
};

const device = {
    mobile: `(max-width: ${size.mobile})`,
    desktop: `(min-width: ${size.desktop})`,

};

export default device;
