const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const port =process.env.PORT || 3000;

app.enable("trust proxy");
const cors=require("cors");
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );

app.use(express.json());
app.use(cookieParser());

const userRouter=require("./routes/userRouter");
const contentRouter=require("./routes/contentRouter");
const postRouter=require("./routes/postRouter");

app.use("/user",userRouter);
app.use("/download",contentRouter);
app.use('/project', postRouter);

app.listen(port, ()=>{
    console.log("listening on ", port);
})

