import { databases } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,

    );
    const todos = data.documents;
    const column = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }
        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            //get the image only if it exist
            ...(todo.image && { image: JSON.parse(todo.image) })
        });
        return acc
    }, new Map<TypedColumn, Column>);
    //if  the column doesn't have inprogress, todo and done , add them with empty todos
    const columnTypes: TypedColumn[] = ["todo", "Inprogress", "done"];
    for (const columnType of columnTypes) {
        if (!column.get(columnType)) {
            column.set(columnType, {
                id: columnType,
                todos: [],
            })
        }
    }

    //sort the columns by the columnTypes

    const sortedColumns = new Map(
        Array.from(column.entries()).sort((a, b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        ))
    )
    const board: Board = {
        colummns: sortedColumns
    }
    return board


}