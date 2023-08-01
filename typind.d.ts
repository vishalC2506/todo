interface Board {
    colummns: Map<TypedColumn, Column>
}

type TypedColumn = "todo" | "Inprogress" | "done";
interface Column {
    id: TypedColumn,
    todos: Todo[]
}
interface Image {
    bucketId: string;
    fileId: string;
}

interface Todo {
    $id: string; //response that we will get from appwrite
    $createdAt: string;
    title: string;
    status: TypedColumn;
    image?: Image;

}

