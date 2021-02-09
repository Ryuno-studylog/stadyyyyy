//配列にしてボードを表現する
class Board{
    public static final int BOARD_SIZE = 8;
    public static final int MAX_TURNS = 60;

    //方向を表す実数
    public static final int NONE = 0;
    public static final int UPPER = 1;
    public static final int UPPER_LEFT = 2;
    public static final int LEFT = 4;
    public static final int LOWER_LEFT = 8;
    public static final int LOWER = 16;
    public static final int LOWER_RIGHT = 32;
    public static final int RIGHT = 64;
    public static final int UPPER_RIGHT = 128;

    private int RawBoard[][] = new int[BOARD_SIZE+2][BOARD_SIZE+2];//＋2とするのは上下左右の端を壁とするため
    private int Turns; //手数。０から始まる。
    private int CurrentColor;//現在のプレイヤー

    private Vector UpdateLog = new Vector();

    private Vector MovablePos[] = new Vector[MAX_TURNS+1];
    private int MovableDir[][][] = new int[MAX_TURNS+1][BOARD_SIZE+2][BOARD_SIZE+2];

    //各色の石の数
    private ColorStorage Discs = new ColorStorage();

    public Board();
    public void init();
    public boolean move(Point point);
    public boolean undo();
    public boolean pass();
    public int getColor(Point point);
    public int getCurrentColor();
    public int getTurns();
    public boolean isGameOver();
    public int countDisc(int color);
    public Vector getMovablePos();
    public Vector getUpdate();

    private int checkMobility(Disc disc);
    private void initMovable();
    private void flipDiscs(Point point);


}

private int Board::checkMobility(Disc disc){

    if(RawBoard[disc.x][disc.y] != EMPTY){return NONE;}

    int x, y;
    int dir = NONE;

    if(RawBoard[disc.x][disc.y-1] == -disc.color){

        x = disc.x;
        y = disc.y-2;
        while(RawBoard[x][y] == -disc.color){y--;}
        if(RawBoard[x][y] == disc.color){dir |= UPPER;}
    }

    if(RawBoard[disc.x][disc.y+1] == -disc.color){

        x = disc.x;
        y = disc.y+2;
        while(RawBoard[x][y] == -disc.color){y++;}
        if(RawBoard[x][y] == disc.color){dir |= LOWER;}
    }

    if(RawBoard[disc.x-1][disc.y] == -disc.color){

        x = disc.x-2;
        y = disc.y;
        while(RawBoard[x][y] == -disc.color){x--;}
        if(RawBoard[x][y] == disc.color){dir |= LEFT;}
    }

    if(RawBoard[disc.x+1][disc.y] == -disc.color){

        x = disc.x+2;
        y = disc.y;
        while(RawBoard[x][y] == -disc.color){x++;}
        if(RawBoard[x][y] == disc.color){dir |= RIGHT;}
    }

    if(RawBoard[disc.x+1][disc.y-1] == -disc.color){

        x = disc.x+2;
        y = disc.y-2;
        while(RawBoard[x][y] == -disc.color){x++; y--;}
        if(RawBoard[x][y] == disc.color){dir |= UPPER_RIGHT;}
    }

    if(RawBoard[disc.x-1][disc.y-1] == -disc.color){

        x = disc.x-2;
        y = disc.y-2;
        while(RawBoard[x][y] == -disc.color){x--; y--;}
        if(RawBoard[x][y] == disc.color){dir |= UPPER_LEFT;}
    }

    if(RawBoard[disc.x+1][disc.y+1] == -disc.color){

        x = disc.x+2;
        y = disc.y+2;
        while(RawBoard[x][y] == -disc.color){x++; y++;}
        if(RawBoard[x][y] == disc.color){dir |= LOWER_RIGHT;}
    }

    if(RawBoard[disc.x-1][disc.y+1] == -disc.color){

        x = disc.x-2;
        y = disc.y+2;
        while(RawBoard[x][y] == -disc.color){x--; y++;}
        if(RawBoard[x][y] == disc.color){dir |= LOWER_LEFT;}
    }
    //IFで指定した一つ隣のマスに相手のコマがあるかをチェック、そのさらに隣から走査し、相手の色がある限り走査を続け、その次のマスに自分の石があれば置ける

}