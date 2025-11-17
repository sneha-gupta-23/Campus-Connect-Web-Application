import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PlacementCard({ placement, onDelete, onApply }) {
  const { user } = useAuth();

  const canModify = user && (user.role === 'Admin' || (user.role === 'HR' && String(user._id) === String(placement.createdBy?._id)));

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{placement.title}</h3>
        <p className="text-sm text-gray-600">{placement.company} • {placement.location || 'Remote'}</p>
        <p className="mt-2 text-sm line-clamp-3">{placement.description}</p>
        <div className="mt-2 text-xs text-gray-500">Type: {placement.type}</div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link to={`/placements/${placement._id}`} className="px-3 py-1 border rounded text-sm">View</Link>

        <div className="flex items-center gap-2">
          {user?.role === 'Student' && (
            <button onClick={() => onApply(placement)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Apply</button>
          )}

          {canModify && (
            <>
              <Link to={`/admin/placements/edit/${placement._id}`} className="px-3 py-1 border rounded text-sm">Edit</Link>
              <button onClick={() => onDelete(placement._id)} className="px-3 py-1 border rounded text-sm text-red-600">Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
