import Image from "next/image";
import styles from "../../ui/dashboard/products/products.module.css";
import Search from "../../ui/dashboard/search/search";
import Pagination from "../../ui/dashboard/pagination/pagination";
import Link from "next/link";
import { fetchProducts } from "../../../lib/data";



export const Buy = async ({searchParams}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { products, count } = await fetchProducts(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for products..." />
        <Link href='/dashboard/products/add'>
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Category</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => ( 
                   
            <tr key={product.id}>
              <td> <div className={styles.products}>
                <Image src={product.img || "/noproduct.jpg"}
                  alt=""
                  width={40}
                  height={40}
                  className={styles.productsImage} />
                {product.title}
              </div>
              </td>
              <td>{product.cat}</td>
              <td>{product.createdAt?.toString().splice(4, 16)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/buy/${product.id}`}>
                    <button className={` ${styles.button} ${styles.buy}`}>Buy</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count}/>
    </div>
  );
};
