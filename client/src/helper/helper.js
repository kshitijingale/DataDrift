export const errorMessage = (error, custom) => {
    return (
        error?.response?.data?.message ||
        error?.message ||
        custom ||
        "Something went wrong, Try again"
    );
};
export function isPasswordValid(password) {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{4,15}$/;
    return passwordRegex.test(password);
}