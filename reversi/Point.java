
//座標系の定義。描画する際の正負を意識して、左上が(0,0)で考える。
class Point{
    public Point(){
        this(0,0);
    }
    public Point(int x, int y){
        this.x = x;
        this.y = y;
    }
    public int x;
    public int y;
}

