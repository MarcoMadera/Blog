interface NodeData {
  nodeIndex: number;
  parentTagName: string;
  tagIndex: number;
}

export interface Note {
  start: NodeData;
  end: NodeData;
  startOffset: number;
  endOffset: number;
  id: string;
  note: string;
  title: string;
  color: string;
}

export function getNode(nodeData: NodeData): ChildNode {
  const parentElement = document.getElementsByTagName(nodeData.parentTagName)[
    nodeData.tagIndex
  ];
  return parentElement.childNodes[nodeData.nodeIndex];
}

export function getContainerInfo(container: Node): NodeData | null {
  const parentElement = container.parentElement;
  const parentTagName = parentElement?.tagName;
  if (!parentTagName) return null;
  const tagIndex = Array.from(
    document.getElementsByTagName(parentTagName)
  ).indexOf(parentElement);
  const nodeIndex = Array.from(parentElement.childNodes).indexOf(
    container as ChildNode
  );

  return {
    parentTagName,
    tagIndex,
    nodeIndex,
  };
}

export function saveToLocalStorage(note: Note): void {
  const selectedHtmlDatas: Record<string, Note[]> = JSON.parse(
    localStorage.getItem("selectedHtmlData") || "{}"
  );
  const path = window.location.pathname;
  const notesForPath = selectedHtmlDatas[path] || [];

  const existingNoteIndex = notesForPath.findIndex((n) => n.id === note.id);
  if (existingNoteIndex >= 0) {
    const updatedNotes = [...notesForPath];
    updatedNotes[existingNoteIndex] = note;
    selectedHtmlDatas[path] = updatedNotes;
  } else {
    selectedHtmlDatas[path] = [...notesForPath, note];
  }

  localStorage.setItem("selectedHtmlData", JSON.stringify(selectedHtmlDatas));
}

export function removeToLocalStorage(id: string): void {
  const selectedHtmlDatas = JSON.parse(
    localStorage.getItem("selectedHtmlData") || "{}"
  );
  const path = window.location.pathname;
  if (selectedHtmlDatas[path]) {
    selectedHtmlDatas[path] = selectedHtmlDatas[path].filter(
      (note: Note) => note.id !== id
    );
  }
  localStorage.setItem("selectedHtmlData", JSON.stringify(selectedHtmlDatas));
}

export function getSelectionRange(): Range | null {
  const selection = window.getSelection();
  const rangeCount = selection?.rangeCount;

  if (rangeCount === 0) return null;

  const range = selection?.getRangeAt(0);
  if (!selection || !range) return null;

  return range;
}
