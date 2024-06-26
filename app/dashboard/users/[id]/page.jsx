import Image from "next/image";
import styles from "../../../ui/dashboard/users/SingleUser/SingleUser.module.css";
import { fetchUser } from "../../../../lib/data";
import { updateUser } from "../../../../lib/actions";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.imgUrl || "/noavatar.png"} alt="" fill />
        </div>
        <div>{user.username}</div>
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label htmlFor="img">Update image</label>
          <input  type="file" id="img" name="img" />
          <input  type="hidden" id="imgUrl" name="imgUrl" value={user.imgUrl}/>
          <label> User name</label>
          <input type="text" name="username" placeholder={user.username} />
          <label> Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label> Password</label>
          <input type="password" name="password" placeholder="******" required />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin" defaultValue={user.isAdmin}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <button>Update</button>
        </form>
      </div>
    </div>
  );
};
export default SingleUserPage;
