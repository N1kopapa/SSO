//全局服务器地址，必要时修改
const serverSrc = process.env.VUE_APP_BASE_API  ;

const uploadUrl = serverSrc+'/api/File';
export default
    {
        uploadUrl,//服务器地址
    }
