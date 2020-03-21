export class Coord {
    public X: number;
    public Y: number;
    public Z: number;
    public constructor(x: number, y: number, z: number) {
        this.X = x;
        this.Y = y;
        this.Z = z;
    }

    public map(fn: (n: number) => number): Coord {
        return new Coord(fn(this.X), fn(this.Y), fn(this.Z));
    }
}
