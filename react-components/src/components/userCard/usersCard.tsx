import { IUserData } from '../../types/types';
import { useAppSelector } from '../../utils/hooks';
import UserCard from './userCard';

export default function UsersCard() {
  const users = useAppSelector((state) => state.users.list);

  return (
    <>
      <div className="user-cards">
        {users.map((user: IUserData, index: number) => (
          <UserCard key={index} userCardItem={user} />
        ))}
      </div>
    </>
  );
}
