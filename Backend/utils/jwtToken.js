// //generate the web token
// export const generateToken = (user, message, statusCode, res)=>{
//     const token = user.generatejsonWebToken();


//     res.status(statusCode).cookie("token",token,
//         {expires: new Date(Date.now() + process.env.COOKIE_EXPIRES *24 *60 *60 *1000),
//             httpOnly: true
//         }).json({
//             success: true,
//             message,
//             token,
//             user,
            
//         });
// };



export const generateToken = (user, message, statusCode, res) => {
  const token = user.generatejsonWebToken();

  res.status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only true in production (Render)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-site cookies
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};
