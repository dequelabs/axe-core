const unsupported = {
	accessibleNameFromFieldValue: ['combobox', 'listbox', 'progressbar'],

	// for the acceptance tests of accessible-text.js we need to have the
	// unsupported array be settable. this function will also be used
	// later (v4.0) when we add these hard coded values as global
	// configuration options (set as private for now)
	_set(value) {
		this.accessibleNameFromFieldValue = value;
	}
};

export default unsupported;
