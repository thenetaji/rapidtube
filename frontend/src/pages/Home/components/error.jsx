function Error({ errorMsg }){
  return(
    <>
      <div className="font-bold text-md text-white mt-3 p-2 bg-red-600 mx-8 rounded-xl">
        <p className="text-center">
          {errorMsg}
        </p>
      </div>
    </>
    )
};

export default Error;