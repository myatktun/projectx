import { Admin, Resource } from "react-admin"
import { dataProvider } from "@projectx/admin/provider"
import { BookList, BookEdit, AuthorList, CategoryList, NoteList } from "@projectx/admin/ui"
import BookIcon from "@mui/icons-material/Book"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import PeopleIcon from "@mui/icons-material/People"
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion"

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="books" list={BookList} edit={BookEdit} icon={BookIcon} />
        <Resource name="authors" list={AuthorList} icon={PeopleIcon} />
        <Resource name="categories" list={CategoryList} icon={AutoAwesomeMotionIcon} />
        <Resource name="notes" list={NoteList} icon={MenuBookIcon} />
    </Admin>
)

export default App
