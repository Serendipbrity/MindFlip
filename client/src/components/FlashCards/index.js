import { VIEW_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const FlashCards = () => {
  const { loading, data } = useQuery(VIEW_USERS);
  const users = data?.viewUsers || [];
  return (
    <div>
      <h1>Flash Cards</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {users.map((user) => {
            return <div>{user.username}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default FlashCards;
