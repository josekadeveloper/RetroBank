// import { useGetUsers } from "../../hooks/use-get-users.hook";

// export default function UserList() {
//   const { data: users, isLoading, error } = useGetUsers();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading users</p>;

//   return (
//     <div className="terminal">
//       <h1>User List</h1>
//       <ul>
//         {users?.map((u) => (
//           <li>
//             {u.username} - {u.balance?.toString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
