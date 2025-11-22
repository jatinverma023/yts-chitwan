import { useEffect, useState } from "react";
import ApiService from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await ApiService.getAdminUsers();
        setUsers(res.users || res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {users.length === 0 ? (
            <div className="bg-white p-4 rounded shadow">No users</div>
          ) : (
            users.map((u) => (
              <div
                key={u._id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-sm text-gray-500">
                    {u.email} • {u.role}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
