declare module 'mojs-curve-editor' {

	class MojsCurveEditor {
		constructor(opts: MojsCurveEditor.Options);
		constructor();

		getEasing();
		getEasing(p: any);
	}

	namespace MojsCurveEditor {
		interface Options {
			name?: string;
			isSaveState?: boolean;
		}

	}

	export = MojsCurveEditor;

}