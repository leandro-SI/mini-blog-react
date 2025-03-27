import styles from "./Search.module.css";
import React from 'react'

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocument";
import { useQuery } from "../../hooks/useQuery";

// components
import PostDetails from '../../components/PostDetails';

import { Link } from "react-router-dom";

const Search = () => {

    const query = useQuery()
    const search = query.get("q")

    const { documents: posts } = useFetchDocuments("posts", search)

    return (
        <div className={styles.search_container}>
            <h2>Search</h2>
            <div>
                {posts && posts.length == 0 && (
                    <div className={styles.no_posts}>
                        <p>Não foram encontrados posts a partir de sua bsuca.</p>
                        <Link to="/" className='btn btn-dark'>Voltar</Link>
                    </div>
                )}
                {posts && posts.map((post) => (
                    <PostDetails key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Search