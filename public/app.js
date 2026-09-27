const form = document.getElementById('assignment-form');
const list = document.getElementById('assignment-list');
const count = document.getElementById('count');
const message = document.getElementById('message');

async function loadAssignments(){
  const res = await fetch('/api/assignments');
  const items = await res.json();
  count.textContent = `${items.length} assignment(s)`;
  list.innerHTML = '';
  if(!items.length){ list.innerHTML='<tr><td colspan="5" class="empty">No assignments yet.</td></tr>'; return; }
  items.forEach(a=>{
    const tr=document.createElement('tr');
    const statusClass=a.status==='Completed'?'completed':'pending';
    tr.innerHTML=`<td>${escapeHtml(a.title)}</td><td>${escapeHtml(a.subject)}</td><td>${a.due_date}</td><td class="status ${statusClass}">${a.status}</td><td><button onclick="toggleAssignment(${a.id})">Toggle</button><button class="danger" onclick="deleteAssignment(${a.id})">Delete</button></td>`;
    list.appendChild(tr);
  });
}

form.addEventListener('submit', async e=>{
  e.preventDefault();
  const body={title:title.value.trim(),subject:subject.value.trim(),due_date:due_date.value};
  const res=await fetch('/api/assignments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  if(res.ok){form.reset();message.textContent='Assignment added.';await loadAssignments();}else{message.textContent='Could not add assignment.';}
});

async function toggleAssignment(id){await fetch(`/api/assignments/${id}/toggle`,{method:'PUT'});await loadAssignments();}
async function deleteAssignment(id){await fetch(`/api/assignments/${id}`,{method:'DELETE'});await loadAssignments();}
function escapeHtml(value){return value.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
loadAssignments();
