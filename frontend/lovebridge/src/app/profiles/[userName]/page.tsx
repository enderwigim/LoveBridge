import Profile from "../../components/Profile/Profile";   

type Props = {
  params: {
    userName: string;
  };
};



export default function ProfilePage({ params }: Props) {
  return (
    <>
        <Profile userName={params.userName} />
    </>
  )
}