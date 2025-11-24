import '@/app/styles/user-info.css';


export interface IUserInfo{
    userEmail: string
}

export default function UserInfo(userInfo: IUserInfo){

    const regex = /@.*/i; //para pegar o que está depois do @
    const name = userInfo.userEmail.replace(regex,""); //para trocar o que está depois do @ por vazio

    return(
        <p className='p'>Olá {name}</p>
    )

}
