import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  avatar: string;
  date: string;
  readTime: string;
  likes: number;
  comments: Comment[];
  image?: string;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Искусство медленной жизни: как найти баланс в быстром мире",
    excerpt: "В нашем стремительном мире важно научиться замедляться и находить гармонию между работой и личной жизнью. Рассказываю о простых практиках осознанности.",
    author: "Анна Смирнова",
    avatar: "/img/446b7a32-2ec7-4271-8c3c-efe16e1118b4.jpg",
    date: "15 сентября",
    readTime: "5 мин",
    likes: 42,
    comments: [
      {
        id: 1,
        author: "Михаил К.",
        avatar: "/placeholder.svg",
        content: "Отличная статья! Особенно понравился совет про утреннюю медитацию.",
        date: "2 часа назад"
      },
      {
        id: 2,
        author: "Елена В.",
        avatar: "/placeholder.svg",
        content: "Спасибо за напоминание о важности пауз в повседневности.",
        date: "5 часов назад"
      }
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Домашний сад на подоконнике: руководство для начинающих",
    excerpt: "Создание уютного зеленого уголка дома не требует большого опыта. Делюсь секретами успешного выращивания растений в квартире.",
    author: "Дмитрий Лебедев",
    avatar: "/img/aa2cec8d-cf50-4f84-8f80-71a1871bc45f.jpg",
    date: "14 сентября",
    readTime: "8 мин",
    likes: 28,
    comments: [
      {
        id: 3,
        author: "Ольга М.",
        avatar: "/placeholder.svg",
        content: "У меня наконец-то зацвела герань благодаря вашим советам!",
        date: "1 день назад"
      }
    ],
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Рецепты домашнего хлеба: традиции и современность",
    excerpt: "Возрождение искусства домашней выпечки приносит не только удовольствие, но и связь с семейными традициями. Простые рецепты для каждого.",
    author: "Мария Петрова",
    avatar: "/placeholder.svg",
    date: "13 сентября",
    readTime: "6 мин",
    likes: 35,
    comments: [],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop"
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<'feed' | 'profile' | 'write'>('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = (articleId: number) => {
    setArticles(prev => prev.map(article =>
      article.id === articleId
        ? { ...article, likes: article.likes + 1 }
        : article
    ));
  };

  const handleComment = (articleId: number) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      author: "Вы",
      avatar: "/placeholder.svg",
      content: newComment,
      date: "только что"
    };

    setArticles(prev => prev.map(article =>
      article.id === articleId
        ? { ...article, comments: [...article.comments, comment] }
        : article
    ));
    setNewComment('');
  };

  const handlePublishArticle = () => {
    if (!newArticle.title.trim() || !newArticle.content.trim()) return;

    const article: Article = {
      id: Date.now(),
      title: newArticle.title,
      excerpt: newArticle.content.substring(0, 150) + "...",
      author: "Вы",
      avatar: "/placeholder.svg",
      date: "только что",
      readTime: Math.ceil(newArticle.content.length / 1000) + " мин",
      likes: 0,
      comments: []
    };

    setArticles(prev => [article, ...prev]);
    setNewArticle({ title: '', content: '' });
    setActiveTab('feed');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Article Network</h1>
            
            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>ВЫ</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Ваш профиль</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8">
            {[
              { id: 'feed', label: 'Лента', icon: 'Home' },
              { id: 'profile', label: 'Профиль', icon: 'User' },
              { id: 'write', label: 'Написать', icon: 'PenTool' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon as any} size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {filteredArticles.map(article => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {article.image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={article.avatar} />
                      <AvatarFallback>{article.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{article.author}</p>
                      <p className="text-xs text-muted-foreground">{article.date} · {article.readTime}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(article.id)}
                        className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Icon name="Heart" size={18} />
                        <span className="text-sm">{article.likes}</span>
                      </button>
                      
                      <button
                        onClick={() => setSelectedArticle(selectedArticle?.id === article.id ? null : article)}
                        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Icon name="MessageCircle" size={18} />
                        <span className="text-sm">{article.comments.length}</span>
                      </button>
                      
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                        <Icon name="Share2" size={18} />
                        <span className="text-sm">Поделиться</span>
                      </button>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      Читать далее
                    </Button>
                  </div>
                  
                  {/* Comments Section */}
                  {selectedArticle?.id === article.id && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-medium mb-4">Комментарии ({article.comments.length})</h4>
                      
                      <div className="space-y-4 mb-6">
                        {article.comments.map(comment => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={comment.avatar} />
                              <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.date}</span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>ВЫ</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <Input
                            placeholder="Добавить комментарий..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleComment(article.id)}
                          />
                          <Button
                            onClick={() => handleComment(article.id)}
                            disabled={!newComment.trim()}
                            size="sm"
                          >
                            Отправить
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-6 mb-8">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-2xl">ВЫ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Ваш профиль</h2>
                    <p className="text-muted-foreground mb-3">Автор на Article Network</p>
                    <div className="flex gap-4 text-sm">
                      <span><strong>5</strong> статей</span>
                      <span><strong>127</strong> подписчиков</span>
                      <span><strong>43</strong> подписки</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Ваши статьи</h3>
                  {articles.filter(a => a.author === "Вы").map(article => (
                    <div key={article.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{article.title}</h4>
                        <p className="text-sm text-muted-foreground">{article.date} · {article.likes} лайков · {article.comments.length} комментариев</p>
                      </div>
                      <Badge variant="secondary">{article.readTime}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Write Tab */}
        {activeTab === 'write' && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Написать статью</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Заголовок</label>
                    <Input
                      placeholder="Введите заголовок статьи..."
                      value={newArticle.title}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Содержание</label>
                    <Textarea
                      placeholder="Расскажите вашу историю..."
                      value={newArticle.content}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                      rows={12}
                    />
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <Button variant="outline">Сохранить черновик</Button>
                    <Button
                      onClick={handlePublishArticle}
                      disabled={!newArticle.title.trim() || !newArticle.content.trim()}
                    >
                      Опубликовать
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}