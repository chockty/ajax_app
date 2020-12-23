class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
    # @post = Post.new
  end

  # def new
  # end

  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post}
#    redirect_to action: :index これでもすぐに一覧ページに遷移できるが、非同期通信ではない。（データ量が増えると動きが遅くなる？）
    binding.pry
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json:{ post: item }
  end

end
