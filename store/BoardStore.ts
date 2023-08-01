import { create } from 'zustand';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { databases, storage, ID } from '@/appwrite';
import uploadImage from '@/lib/uploadImage';
interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    newTaskInput: string;
    searchString: string;
    newTaskType: TypedColumn;
    image: File | null;
    setNewTaskInput: (input: string) => void;
    setSearchString: (searchString: string) => void;
    addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void,
    setNewTaskType: (columnId: TypedColumn) => void;
    setImage: (image: File | null) => void;

}
export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        colummns: new Map<TypedColumn, Column>()
    },
    searchString: "",
    newTaskInput: "",
    newTaskType: "todo",
    setNewTaskInput: (input: string) => set({ newTaskInput: input }),
    setSearchString: (searchString) => set({ searchString }),
    getBoard: async () => {
        const board = await getTodosGroupedByColumn();
        set({ board });

    },
    image: null,
    deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
        const newColumns = new Map(get().board.colummns);
        //delete todoId from newColumns
        newColumns.get(id)?.todos.splice(taskIndex, 1);
        set({ board: { colummns: newColumns } });
        if (todo.image) {
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
        }
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
        );
    },
    setImage: (image: File | null) => set({ image }),
    setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),
    setBoardState: board => set({ board }),
    updateTodoInDB: async (todo, columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,

            todo.$id,
            {
                title: todo.title,
                status: columnId,
            }
        )
    },
    addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
        let file: Image | undefined;
        if (image) {
            const fileUploaded = await uploadImage(image);
            if (fileUploaded) {
                file = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id,
                };
            }

        }
        const { $id } = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                //including image if it exist
                ...(file && { image: JSON.stringify(file) })
            }

        );
        set({ newTaskInput: "" });
        set((state) => {
            const newColumns = new Map(state.board.colummns);
            const newTodo: Todo = {
                $id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                //including image if it exist
                ...(file && { image: file }),
            };
            const column = newColumns.get(columnId);
            if (!column) {
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo],
                });
            } else {
                newColumns.get(columnId)?.todos.push(newTodo);
            }
            return {
                board: {
                    colummns: newColumns,
                }
            }
        })
    }

}))
