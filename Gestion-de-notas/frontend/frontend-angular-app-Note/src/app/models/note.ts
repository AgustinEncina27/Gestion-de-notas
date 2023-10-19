import { Category } from "./category";

export class Note {
    id!: number;
    title!: string;
    content!: string;
    noteCreationDay!: Date;
    lastEdit!: Date;
    archived!: boolean;
    categories!: Category[];
}
