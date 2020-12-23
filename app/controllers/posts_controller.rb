class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
    # @post = Post.new
  end

  # def new
  # end

  def create
    Post.create(content: params[:content])
    redirect_to(root)
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
    else
      post.update(checked :true)
    end

    item = Post.find(params[:id])
    render json: {post: item}
  end

end
