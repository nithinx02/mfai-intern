import React, { useState } from "react";
import Button from "../components/Button";

function AccountInputs() {
  const [user, setUser] = useState({
    username: "",
    gender: "",
    location: "",
    birthday: "",
    summary: "",
    githubLink: "",
    linkedinLink: "",
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(user[field]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, [editingField]: tempValue });
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  return (
    <form onSubmit={handleSave}>
      {Object.keys(user).map((key) => (
        <div
          key={key}
          className="flex items-center py-6 border-b max-sm:gap-2 max-sm:flex-col gap-4"
        >
          <div className="flex justify-between max-sm:w-full">
            <p className="capitalize font-medium text-xl">{key}:</p>
            <div className="mt-2 sm:mt-0 hidden max-sm:block">
              {key !== "username" && (
                <button
                  type="button"
                  onClick={() =>
                    editingField === key ? handleSave() : handleEdit(key)
                  }
                  className="text-blue-500 hover:underline"
                >
                  {editingField === key ? "" : "Edit"}
                </button>
              )}
            </div>
          </div>

          {editingField === key ? (
            key === "birthday" ? (
              <div className="w-full">
                <input
                  type="date"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="px-2 py-1 flex-1 border rounded-md w-full"
                />
                <div className="flex justify-start mt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 border rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <Button type="submit" className="!p-2">
                    Save
                  </Button>
                </div>
              </div>
            ) : key === "summary" ? (
              <div className="w-full">
                <textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="border px-2 py-1 rounded-md h-40 w-full"
                  rows={4}
                />
                <div className="flex justify-start mt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 border rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <Button type="submit" className="!p-2">
                    Save
                  </Button>
                </div>
              </div>
            ) : key === "gender" ? (
              <div className="w-full">
                <select
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="px-2 py-1 flex-1 border rounded-md w-full"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="flex justify-start mt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 border rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <Button type="submit" className="!p-2">
                    Save
                  </Button>
                </div>
              </div>
            ) : key.match(/Link$/) ? ( // Handles both githubLink and linkedinLink
              <div className="w-full">
                <input
                  type="url"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="px-2 py-1 flex-1 border rounded-md w-full"
                />
                <div className="flex justify-start mt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 border rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <Button type="submit" className="!p-2">
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="px-2 py-1 flex-1 border rounded-md w-full"
                />
                <div className="flex justify-start mt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 border rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <Button type="submit" className="!p-2">
                    Save
                  </Button>
                </div>
              </div>
            )
          ) : (
            <p className="text-gray-950 flex-grow max-sm:w-full">
              {key === "birthday"
                ? user[key]
                  ? new Date(user[key]).toLocaleDateString()
                  : "-"
                : user[key] || "-"}
            </p>
          )}

          <div className="max-sm:hidden">
            {key !== "username" && (
              <button
                type="button"
                onClick={() =>
                  editingField === key ? handleSave() : handleEdit(key)
                }
                className="text-blue-500 hover:underline"
              >
                {editingField === key ? "" : "Edit"}
              </button>
            )}
          </div>
        </div>
      ))}
    </form>
  );
}

export default AccountInputs;
