import React, { useState, useEffect, useCallback } from 'react';
import { Skeleton, List } from 'antd';
import moment from 'moment';

// temp
const listData = [];
for (let i = 0; i < 12; i++) {
    listData.push({
        id: i + 1,
        author: "Georgia Reader",
        createdAt: new Date(),
        content:
            'Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.',
    });
}

function ArticlePost(props) {
    const [article, setarticle] = useState('')
    const [loading, setLoading] = useState(false)
    const endPoint = "https://611a2d11cbf1b30017eb5564.mockapi.io/api/v1/blogs"

    //get data from api
    const load = useCallback((id) => {
        setLoading(true)
        fetch(endPoint + `/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Loaded")
                console.log(data)
                setarticle(data)
                setLoading(false)
            });
    }, [])
    // Useffect: Fetch data 
    useEffect(() => {
        if (props.match.params.id) {
            load(props.match.params.id);
        }
    }, [props.match.params.id, load])

    return (
        <>
            <div className="article-container" id="article">
                <div className="container pt-3">
                    <div className="row">
                        <div className="col-lg-3 col-12"></div>
                        <div className="col-lg-9 col-12">
                            <div className="panel-sort d-flex justify-content-between pb-3">
                                <div className="d-inline-block"><h2>Article</h2></div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 col-12">
                            {/* author for normal to medium scaled screen */}
                            <div className="d-none d-lg-block">
                                <div className="post-author card shadow mb-3">
                                    <div className="card-body text-center">
                                        <h5>Author details</h5>
                                        <Skeleton active loading={loading}>
                                            <div className="img-wrapper my-4 rounded-circle shadow">
                                                <a href="# "><img src="https://i.ibb.co/hCyPJWx/PriceCo.png" className="" alt="" /></a>
                                            </div>
                                            <h4 className="author-name">Dr. {article.author}</h4>
                                            <h6 className="author-title">Neurologist</h6>
                                            <p>Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.</p>
                                        </Skeleton>
                                    </div>
                                </div>
                            </div>
                            {/* author for medium to small scaled screen */}
                            <div className="d-lg-none">
                                <div className="post-author-md card shadow mb-3">
                                    <div className="card-body d-flex align-items-center">
                                        <Skeleton active loading={loading}>
                                            <a href="# "><img src="https://i.ibb.co/hCyPJWx/PriceCo.png" className="rounded-circle float-left shadow" alt="" /></a>
                                            <div className="ml-2">
                                                <h4 className="author-name mb-1">Dr. {article.author}</h4>
                                                <h6 className="author-title mb-1">Neurologist</h6>
                                                <p>Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.</p>
                                            </div>
                                        </Skeleton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-12">
                            <div className="post-entry card shadow mb-5">
                                <div className="card-body">
                                    <Skeleton active loading={loading}>
                                        <h5 className="entry-category mb-4">Covid-19</h5>
                                        <h2 className="entry-title"><a href="# ">{article.title}</a></h2>
                                        <div className="entry-meta">
                                            <ul>
                                                <li className="d-flex align-items-center"><i className="fa fa-clock"></i> <a href="# ">{moment(article.createdAt).format("MMM DD, YYYY")}</a></li>
                                                <li className="d-flex align-items-center"><i className="fa fa-comment"></i> <a href="# ">{article.cmtCount} Comments</a></li>
                                                <li className="d-flex align-items-center"><i className="fa fa-heart"></i> <a href="# ">{article.likeCount} Likes</a></li>
                                            </ul>
                                        </div>
                                        <div className="entry-content">
                                            <p>
                                                <p>
                                                    Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
                                                    Et eveniet enim. Qui velit est ea dolorem doloremque deleniti aperiam unde soluta. Est cum et quod quos aut ut et sit sunt. Voluptate porro consequatur assumenda perferendis dolore.
                                                </p>

                                                <p>
                                                    Sit repellat hic cupiditate hic ut nemo. Quis nihil sunt non reiciendis. Sequi in accusamus harum vel aspernatur. Excepturi numquam nihil cumque odio. Et voluptate cupiditate.
                                                </p>

                                                <blockquote>
                                                    <p>
                                                        Et vero doloremque tempore voluptatem ratione vel aut. Deleniti sunt animi aut. Aut eos aliquam doloribus minus autem quos.
                                                    </p>
                                                </blockquote>

                                                <p>
                                                    Sed quo laboriosam qui architecto. Occaecati repellendus omnis dicta inventore tempore provident voluptas mollitia aliquid. Id repellendus quia. Asperiores nihil magni dicta est suscipit perspiciatis. Voluptate ex rerum assumenda dolores nihil quaerat.
                                                    Dolor porro tempora et quibusdam voluptas. Beatae aut at ad qui tempore corrupti velit quisquam rerum. Omnis dolorum exercitationem harum qui qui blanditiis neque.
                                                    Iusto autem itaque. Repudiandae hic quae aspernatur ea neque qui. Architecto voluptatem magni. Vel magnam quod et tempora deleniti error rerum nihil tempora.
                                                </p>

                                                <h3>Et quae iure vel ut odit alias.</h3>
                                                <p>
                                                    Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit ut rerum atque. Optio provident dolores atque voluptatem rem excepturi molestiae qui. Voluptatem laborum omnis ullam quibusdam perspiciatis nulla nostrum. Voluptatum est libero eum nesciunt aliquid qui.
                                                    Quia et suscipit non sequi. Maxime sed odit. Beatae nesciunt nesciunt accusamus quia aut ratione aspernatur dolor. Sint harum eveniet dicta exercitationem minima. Exercitationem omnis asperiores natus aperiam dolor consequatur id ex sed. Quibusdam rerum dolores sint consequatur quidem ea.
                                                    Beatae minima sunt libero soluta sapiente in rem assumenda. Et qui odit voluptatem. Cum quibusdam voluptatem voluptatem accusamus mollitia aut atque aut.
                                                </p>
                                                <img src="http://content.health.harvard.edu/wp-content/uploads/2021/08/6b44b319-8679-4ed0-a059-a68a3179502c.jpg" class="img-fluid" alt="" />

                                                <h3>Ut repellat blanditiis est dolore sunt dolorum quae.</h3>
                                                <p>
                                                    Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro amet nostrum. In assumenda quia quae a id praesentium. Quos deleniti libero sed occaecati aut porro autem. Consectetur sed excepturi sint non placeat quia repellat incidunt labore. Autem facilis hic dolorum dolores vel.
                                                    Consectetur quasi id et optio praesentium aut asperiores eaque aut. Explicabo omnis quibusdam esse. Ex libero illum iusto totam et ut aut blanditiis. Veritatis numquam ut illum ut a quam vitae.
                                                </p>
                                                <p>
                                                    Alias quia non aliquid. Eos et ea velit. Voluptatem maxime enim omnis ipsa voluptas incidunt. Nulla sit eaque mollitia nisi asperiores est veniam.
                                                </p>
                                            </p>
                                        </div>
                                    </Skeleton>
                                </div>
                            </div>
                            <div class="post-comments">
                                <h4 class="comments-count font-weight-bold">{listData.length} Comments</h4>
                                <List
                                    grid={{
                                        gutter: 16,
                                        column: 1,
                                    }}
                                    pagination={{ pageSize: 5, simple: true }}
                                    dataSource={listData}
                                    renderItem={cmt => (
                                        <List.Item key={cmt.id}>
                                            <div id="comment" class="comment">
                                                <div class="d-flex">
                                                    <div class="comment-img mr-3"><img src="https://i.ibb.co/N6SXWfm/Price-Co-1.png" alt="" /></div>
                                                    <div>
                                                        <h6>{cmt.author}</h6>
                                                        <small className="text-muted">{moment(cmt.createdAt).format("MMM DD, YYYY")}</small>
                                                        <p>{cmt.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                            <div class="reply-form card shadow mb-5">
                                <div className="card-body">
                                    <h4>Leave a Reply</h4>
                                    <form>
                                        {/* <div class="row">
                                            <div class="col-md-6 form-group">
                                                <input name="name" type="text" class="form-control" placeholder="Your Name*" />
                                            </div>
                                            <div class="col-md-6 form-group">
                                                <input name="email" type="text" class="form-control" placeholder="Your Email" />
                                            </div>
                                        </div> */}
                                        <div class="d-flex my-3">
                                            <div class="comment-img mr-3"><img src="https://i.ibb.co/N6SXWfm/Price-Co-1.png" alt="" /></div>
                                            <textarea name="comment" class="form-control" placeholder="Enter your comment"></textarea>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p>Signed in as <b>Georgia Reader</b></p>
                                            <button type="submit" class="btn btn-custom">Post Comment</button>
                                        </div>


                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ArticlePost;
