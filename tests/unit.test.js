const test = require('node:test');
const assert = require('node:assert');

test('basic assignment validation', () => {
  const assignment = { title: 'CN Record', subject: 'Computer Networks', due_date: '2026-10-01' };
  assert.ok(assignment.title && assignment.subject && assignment.due_date);
});

test('status toggles between Pending and Completed', () => {
  const nextStatus = status => status === 'Completed' ? 'Pending' : 'Completed';
  assert.equal(nextStatus('Pending'), 'Completed');
  assert.equal(nextStatus('Completed'), 'Pending');
});
