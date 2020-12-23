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

end
