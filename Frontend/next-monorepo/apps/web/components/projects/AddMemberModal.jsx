'use client';

import { useState, useEffect } from 'react';
import { Button } from '@workspace/ui/components/button';
import Modal from '@/components/ui/Modal';
import handleError from '@/lib/utils/handleError';

export default function AddMemberModal({ isOpen, onClose, onAdd }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return setError('Email is required');
    try {
      setLoading(true);
      await onAdd(email.trim());
      setEmail('');
      onClose();
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Team Member">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          The user must already have an account. Enter their email address to add them as a member.
        </p>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <input
            type="email"
            placeholder="member@example.com"
            value={email}
            onChange={(e) => { setError(null); setEmail(e.target.value); }}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
        )}

        <div className="flex justify-end gap-3 pt-1">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Member'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
